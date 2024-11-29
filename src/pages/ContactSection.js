import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Textarea,
  Text
} from '@chakra-ui/react'
import emailjs from '@emailjs/browser'
import { useColorMode } from '../components/ui/color-mode'

const ContactSection = () => {
  const { colors } = useColorMode()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [scrollProgress, setScrollProgress] = useState(0)
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('contact')
      if (section) {
        const rect = section.getBoundingClientRect()
        console.log('rect.top:', rect.top, 'rect.height:', rect.height) // Debugging output
        const progress = Math.min(
          Math.max((window.innerHeight - rect.top) / rect.height, 0),
          1
        )
        setScrollProgress(progress)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validateForm = () => {
    const { name, email, message } = formData
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!name || !email || !message) {
      setError('All fields are required.')
      return false
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.')
      return false
    }
    setError('')
    return true
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!validateForm()) return

    // Use EmailJS to send the email
    emailjs
      .send(
        'service_tc52rx7', // Replace with your EmailJS Service ID
        'template_axk1mdb', // Replace with your EmailJS Template ID
        {
          from_name: formData.name,
          to_name: 'Rachida',
          email: formData.email,
          from_email: formData.email,
          to_email: 'elhadyrachida711@gmail.com',
          message: formData.message
        },
        '1I4Snu4edJuW6V6eu' // Replace with your EmailJS Public Key
      )
      .then(
        () => {
          setSuccess('Message sent successfully!')
          setFormData({ name: '', email: '', message: '' }) // Clear form
        },
        () => {
          setError('Failed to send the message. Please try again.')
        }
      )
  }

  return (
    <Box
      id='contact'
      py={16}
      px={8}
      bg={colors.secondary}
      position='relative'
      borderRadius='lg'
    >
      {/* Background Dashes */}
      <Box
        position='absolute'
        bottom='0'
        right='0'
        width='100%'
        height='100%'
        zIndex={0}
        opacity='0.3'
        bg='transparent'
        backgroundImage={`radial-gradient(${colors.gradientColor} 2px, transparent 0)`}
        backgroundSize='15px 13px'
        // transform={`translateX(${scrollProgress * 400}px)
        //      translateY(${scrollProgress * 500}px)
        //  rotate(45deg)`}
        transition='transform 0.2s ease'
        clipPath={`ellipse(${100 - scrollProgress * 100 + 50}% ${
          100 - scrollProgress * 100 + 40
        }% at 100% 100%)`}
      />

      <Flex
        direction='column'
        alignItems='center'
        justifyContent='center'
        maxW='800px'
        mx='auto'
        textAlign='center'
      >
        <Heading fontSize='4xl' color={colors.textInverted} mb={6}>
          Contact Me
        </Heading>
        <Text fontSize='lg' color={colors.textInverted} mb={8}>
          Got a question or want to collaborate on a project? I’d love to hear
          from you! Fill out the form below to get in touch.
        </Text>

        {/* Contact Methods */}
        <Box textAlign='center' mb={6}>
          <Text fontSize='xl' color={colors.textInverted}>
            You can reach me via:
          </Text>
          <Text fontSize='lg' color={colors.textInverted} mt={2}>
            Phone: <strong>+966 546905184</strong>
          </Text>
          <Text fontSize='lg' color={colors.textInverted} mt={2}>
            Phone: <strong>+961 81977603</strong>
          </Text>
          <Text fontSize='lg' color={colors.textInverted} mt={2}>
            Email: <strong>elhadyrachida71@gmail.com</strong>
          </Text>
          <Text fontSize='lg' color={colors.textInverted} mt={2}>
            ----------- or -----------
          </Text>
        </Box>

        {/* Email Form */}
        <Flex
          as='form'
          direction='column'
          w='100%'
          maxW='500px'
          bg={colors.textInverted}
          p={8}
          borderRadius='lg'
          shadow='lg'
          gap={4}
          onSubmit={handleSubmit}
        >
          <Input
            name='name'
            placeholder='Your Name'
            size='lg'
            value={formData.name}
            onChange={handleChange}
            focusBorderColor='teal.400'
          />
          <Input
            name='email'
            placeholder='Your Email'
            size='lg'
            type='email'
            value={formData.email}
            onChange={handleChange}
            focusBorderColor='teal.400'
          />
          <Textarea
            name='message'
            placeholder='Your Message'
            size='lg'
            rows={5}
            value={formData.message}
            onChange={handleChange}
            focusBorderColor='teal.400'
          />
          {error && <Text color='red.500'>{error}</Text>}
          {success && <Text color='green.500'>{success}</Text>}
          <Button
            size='lg'
            colorScheme='teal'
            type='submit'
            _hover={{ bg: colors.primary }}
          >
            Send Message
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

export default ContactSection
