import nuxtSvg from 'assets/images/NuxtIcon.svg'
import scssISvg from 'assets/images/ScssIcon.svg'

export const numbers = {
  lebanese: { number: '+96181977603', text: '+961 81977603' },
  // saudi: { number: '+966546905184', text: '+966 546905184' },
}

export const isMobile =
  /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
    navigator.userAgent
  )

export const technologies = {
  frontendTechnologies: [
    {
      imgSrc: 'https://www.svgrepo.com/show/452130/vue.svg',
      label: 'Vue.js',
    },
    {
      imgSrc:
        'https://nuxt.com/cdn-cgi/image/w=40,h=40/https://raw.githubusercontent.com/nuxt/modules/main/icons/nuxt.svg',
      localSrc: nuxtSvg,
      label: 'Nuxt',
    },
    {
      imgSrc: 'https://www.svgrepo.com/show/355190/reactjs.svg',
      label: 'React.js / React Native',
    },
    {
      imgSrc: 'https://www.svgrepo.com/show/355081/js.svg',
      label: 'JavaScript',
    },
    {
      imgSrc: 'https://www.svgrepo.com/show/349540/typescript.svg',
      label: 'TypeScript',
    },
    {
      imgSrc:
        'https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png',
      label: 'Redux',
    },
    {
      imgSrc:
        'https://cdn.icon-icons.com/icons2/2389/PNG/512/expo_logo_icon_145293.png',
      label: 'Expo',
    },
    {
      imgSrc: 'https://www.svgrepo.com/show/374068/scss.svg',
      localSrc: scssISvg,
      label: 'Scss',
    },
    // {
    //   imgSrc:
    //     'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjC97Z8BResg5dlPqczsRCFhP6zewWX0X0e7fVPG-G7PuUZwwZVsi9OPoqJYkgqT2h0FI95SsmWzVEgpt8b8HAqFiIxZ98TFtY4lE0b8UrtVJ2HrJebRwl6C9DslsQDl9KnBIrdHS6LtkY/s1600/jetpack+compose+icon_RGB.png',
    //   label: 'Jetpack Compose',
    // },
    // {
    //   imgSrc:
    //     'https://www.logo.wine/a/logo/Kotlin_(programming_language)/Kotlin_(programming_language)-Logo.wine.svg',
    //   label: 'Kotlin',
    // },
    // {
    //   imgSrc:
    //     'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/181_Java_logo_logos-512.png',
    //   label: 'Java',
    // },
    {
      imgSrc: 'https://www.svgrepo.com/show/353782/git-icon.svg',
      label: 'Git',
    },
  ],
  otherTechnologies: [
    {
      imgSrc:
        'https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg',
      label: 'C++',
    },
    {
      imgSrc: 'https://www.svgrepo.com/show/354119/nodejs-icon.svg',
      label: 'Node.js',
    },
    {
      imgSrc: 'https://www.svgrepo.com/show/355133/mysql.svg',
      label: 'MySQL',
    },
    {
      imgSrc:
        'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
      label: 'Figma',
    },
    {
      imgSrc: 'https://www.svgrepo.com/show/353985/laravel.svg',
      label: 'Laravel',
    },
    {
      imgSrc: 'https://static.cdnlogo.com/logos/p/20/postman.svg',
      label: 'Postman',
    },
    {
      imgSrc:
        'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
      label: 'AWS',
    },
  ],
}
