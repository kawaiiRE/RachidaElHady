import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Textarea,
  Text,
  HStack,
  IconButton,
  Icon
} from '@chakra-ui/react'
import emailjs from '@emailjs/browser'
import { useColorMode } from '../components/ui/color-mode'
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa'

import {
  EmailButton,
  LinkedinButton,
  GithubButton
} from '../components/common/icons/Buttons'
import { numbers } from '../components/common/predefined'

const ContactSection = () => {
  const { colors, fonts } = useColorMode()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [scrollProgress, setScrollProgress] = useState(0)
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('contactSection')
      if (section) {
        const rect = section.getBoundingClientRect()
        console.log('rect.top:', rect.top, 'rect.height:', rect.height) // Debugging output
        const adjustedTop = rect.top + 300

        const progress = Math.min(
          Math.max((window.innerHeight - adjustedTop) / rect.height, 0),
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

  const actions = [
    {
      icon: <FaWhatsapp />,
      color: '#25D366',
      label: 'Message on WhatsApp',
      action: phone => window.open(`https://wa.me/${phone}`, '_blank'),
      size: 'md'
    },
    {
      icon: <FaPhoneAlt />,
      label: 'Call on Dial',
      color: colors.textInverted,
      onHover: { color: colors.primary },
      action: phone => (window.location.href = `tel:${phone}`)
    }
  ]

  const renderActions = phone => (
    <HStack spacing={2}>
      {actions.map(({ icon, label, action, color, size, onHover }, index) => (
        <IconButton
          key={index}
          aria-label={label}
          onClick={() => action(phone)}
          colorScheme='gray'
          size={size ?? 'sm'}
          variant='ghost'
          _hover={{
            ...onHover,
            transform: 'scale(1.1)',
            bg: colors.background // Optional hover background color
          }}
          color={color}
        >
          {icon}
        </IconButton>
      ))}
    </HStack>
  )

  return (
    <Box
      id='contactSection'
      py={16}
      px={8}
      bg={colors.backgroundInverted}
      position='relative'
      borderRadius='lg'
      w='90%'
      justifySelf='center'
    >
      {/* Background Dashes */}
      <Box
        position='absolute'
        bottom='0'
        right='0'
        width='130%'
        height='130%'
        zIndex={0}
        opacity='0.3'
        bg='transparent'
        backgroundImage={`radial-gradient(${colors.gradientColor} 2px, transparent 0)`}
        backgroundSize='15px 13px'
        // transform={`translateX(${scrollProgress * 400}px)
        //      translateY(${scrollProgress * 500}px)
        //  rotate(45deg)`}
        transition='transform 0.2s ease'
        clipPath={`ellipse(${100 - scrollProgress * 100 + 10}% ${
          100 - scrollProgress * 100 + 5
        }% at 100% 100%)`}
      />

      <Flex
        direction='column'
        alignItems='center'
        justifyContent='center'
        maxW='800px'
        mx='auto'
        textAlign='center'
        zIndex={1}
      >
        <Heading
          fontSize='4xl'
          color={colors.textInverted}
          mb={6}
          fontFamily={fonts.main}
        >
          Contact Me
        </Heading>
        <Text
          fontSize='lg'
          color={colors.textInverted}
          mb={8}
          fontFamily={fonts.main}
        >
          Got a question or want to collaborate on a project? I’d love to hear
          from you! Fill out the form below to get in touch.
        </Text>

        {/* Contact Methods */}
        <Box textAlign='center' mb={6} zIndex={1}>
          <Text
            fontSize='xl'
            color={colors.textInverted}
            fontFamily={fonts.main}
          >
            You can reach me via:
          </Text>
          {/* <Text
            fontSize='lg'
            color={colors.textInverted}
            mt={2}
            fontFamily={fonts.main}
          >
            Phone: <strong>+966 546905184</strong>
          </Text>
          <Text
            fontSize='lg'
            color={colors.textInverted}
            mt={2}
            fontFamily={fonts.main}
          >
            Phone: <strong>+961 81977603</strong>
          </Text> */}
          {/* Phone Numbers */}
          {Object.values(numbers).map((phone, index) => (
            <Flex
              key={index}
              mt={4}
              alignItems='center'
              justifyContent='space-between'
              gap={4}
            >
              <Text
                fontSize='lg'
                color={colors.textInverted}
                mt={2}
                fontFamily={fonts.main}
                // textShadow={`0 0 2px ${colors.background}`}
              >
                Phone:{' '}
                <Box
                  as='span'
                  letterSpacing='wider'
                  fontWeight='bold'
                  fontFamily={fonts.main}
                >
                  {phone.text}
                </Box>
              </Text>
              {renderActions(phone.number)}
            </Flex>
          ))}
          <Flex
            mt={4}
            alignItems='center'
            justifyContent='space-between'
            gap={4}
          >
            <Text
              fontSize='lg'
              color={colors.textInverted}
              mt={2}
              fontFamily={fonts.main}
            >
              Email:{' '}
              <Box
                as='span'
                letterSpacing='wider'
                fontWeight='bold'
                fontFamily={fonts.main}
              >
                elhadyrachida71@gmail.com
              </Box>
            </Text>
            {/* <Box
              as='a'
              href='mailto:elhadyrachida71@gmail.com'
              ml={2}
              size='md'
              _hover={{ transform: 'scale(1.1)' }}
            >
              <IconButton
                // aria-label={label}
                colorScheme='gray'
                size={'md'}
                variant='ghost'
                // _hover={{
                //   transform: 'scale(1.1)',
                //   bg: colors.background // Optional hover background color
                // }}
                color={colors.textInverted}
              >
                <HiOutlineMail />
              </IconButton>
            </Box> */}
            <EmailButton />
          </Flex>
          <Flex
            mt={4}
            alignItems='center'
            justifyContent='space-evenly'
            gap={4}
          >
            <LinkedinButton />
            <GithubButton />
          </Flex>
          <Text
            fontSize='lg'
            color={colors.textInverted}
            mt={2}
            fontFamily={fonts.main}
          >
            ----------- or -----------
          </Text>
        </Box>

        {/* Email Form */}
        <Flex
          as='form'
          direction='column'
          w='100%'
          maxW='500px'
          bg={colors.background}
          p={8}
          borderRadius='lg'
          shadow='lg'
          gap={4}
          onSubmit={handleSubmit}
          zIndex={1}
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
          {error && (
            <Text color='red.500' fontFamily={fonts.main}>
              {error}
            </Text>
          )}
          {success && (
            <Text color='green.500' fontFamily={fonts.main}>
              {success}
            </Text>
          )}
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
