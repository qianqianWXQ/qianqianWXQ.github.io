import './App.css'
import useNavShrink from './hooks/useNavShrink'
import useScrollSpy from './hooks/useScrollSpy'
import Header from './components/Header'
import Nav from './components/Nav'
import IntroSection from './components/IntroSection'
import PortfolioSection from './components/PortfolioSection'
import ProjectsSection from './components/ProjectsSection'
import SelfRecommend from './components/SelfRecommend'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

const App = () => {
    useNavShrink()
    const { activeId, lockActive } = useScrollSpy()

    const handleNavClick = (e, href) => {
        e.preventDefault()
        lockActive(href)
        const id = href.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <div id="wrapper">
            <Header />
            <Nav activeId={activeId} onNavClick={handleNavClick} />
            <div id="main">
                <IntroSection />
                <PortfolioSection />
                <ProjectsSection />
                <SelfRecommend />
                <ContactSection />
            </div>
            <Footer />
        </div>
    )
}

export default App
