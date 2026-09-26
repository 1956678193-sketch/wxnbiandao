import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Works from './components/Works'
import Records from './components/Records'
import Strengths from './components/Strengths'
import Contact from './components/Contact'
import { ContentProvider, useContent } from './editor/ContentContext'
import EditorBar from './editor/EditorBar'

const SECTIONS = ['hero', 'about', 'works', 'records', 'strengths', 'contact']

function Page() {
  const { content } = useContent()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [content])

  return (
    <>
      <Nav scrolled={scrolled} active={active} />
      <main>
        <Hero />
        <About />
        <Works />
        <Records />
        <Strengths />
        <Contact />
      </main>
      <EditorBar />
    </>
  )
}

export default function App() {
  return (
    <ContentProvider>
      <Page />
    </ContentProvider>
  )
}
