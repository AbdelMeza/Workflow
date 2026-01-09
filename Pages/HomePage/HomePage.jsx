import './HomePage.css'
import TextSlider from '../../Components/TextSlider/TextSlider'
import Button from '../../Components/Button/Button'
import authentificationManagement from '../../Stores/Authentification'
import UserProfile from '../../utils/UserProfile/UserProfile'
import { useEffect } from 'react'

/**
 * HomePage
 *
 * Main landing page of the application.
 * It displays:
 * - Navigation bar
 * - Hero section
 * - Dashboard preview
 */
export default function HomePage() {
    const { getUserData } = authentificationManagement()

    useEffect(() => {
        const fetchUserData = async () => {
            await getUserData()
        }

        fetchUserData()
        document.title = "Workflow — Home"
    }, [])

    return (
        <div className="home-page bgc-lv1">
            <NavBar />
            <HeroSection />
            <PreviewContainer />
        </div>
    )
}

/**
 * NavBar
 *
 * Top navigation bar displayed on the homepage.
 * It adapts based on authentication state:
 * - If user is logged in → show Dashboard + UserProfile
 * - If not logged in → show Login / Get Started buttons
 */
function NavBar() {
    const { userData } = authentificationManagement()

    return (
        <div className="navigation-bar flex">
            <div className="navigation-bar-content main-link-container flex">
                <div className="main-link flex gap-1 flex-c">
                    <img
                        src="https://raw.githubusercontent.com/AbdelMeza/Workflow/main/assets/Icons/Workflow_icon.png"
                        alt="workflow-icon"
                        width={25}
                    />
                    <TextSlider
                        type="navigate"
                        redirectTo="/"
                        classGiven="mt-c"
                        content="WorkFlow"
                    />
                </div>
            </div>

            <div className="navigation-bar-content navigation-links-container flex-c gap-3">
                <TextSlider type="navigate" redirectTo="/" classGiven="mt-c" content="Features" />
                <TextSlider type="navigate" redirectTo="/" classGiven="mt-c" content="Pricing" />
                <TextSlider type="navigate" redirectTo="/" classGiven="mt-c" content="Contact" />
                <TextSlider type="navigate" redirectTo="/" classGiven="mt-c" content="Support" />
                <TextSlider type="navigate" redirectTo="/" classGiven="mt-c" content="FAQ" />
            </div>

            <div className="navigation-bar-content authentification-buttons flex jc-r">
                {userData ? (
                    <>
                        <Button content="Dashboard" size="small" path="/dashboard" />
                        <UserProfile />
                    </>
                ) : (
                    <>
                        <Button content="Login" size="small" path="/login" />
                        <Button
                            content="Get started"
                            size="small"
                            classGiven="btn-bgc brad-1"
                            path="/signup"
                        />
                    </>
                )}
            </div>
        </div>
    )
}

/**
 * HeroSection
 *
 * Main hero section with a marketing message.
 * Displays a CTA button only if the user is not authenticated.
 */
function HeroSection() {
    const { userData } = authentificationManagement()
    return (
        <section
            className="hero-section"
            style={{
                backgroundImage:
                    "url('https://raw.githubusercontent.com/AbdelMeza/Workflow/main/assets/Backgrounds/Grid_background.png')"
            }}
        >
            <div className="hero-section-content flex-c flex-d-c gap-3">
                <div className="upper-content">
                    <span className="main-headline b-fs mff-b mt-c">
                        Manage Your Clients and <br /> Projects Effortlessly
                    </span>
                </div>

                <div className="lower-content flex-c flex-d-c gap-2">
                    <span className="sub-headline n-fs st-c">
                        Track clients, organize projects, and collaborate <br />
                        effortlessly—all in one place.
                    </span>

                    {userData ? (
                        <Button
                            content="Dashboard"
                            size="small"
                            classGiven="btn-bgc brad-1"
                            path="/dashboard"
                        />

                    ) : <Button
                        content="Get started"
                        size="small"
                        classGiven="btn-bgc brad-1"
                        path="/signup"
                    />}
                </div>
            </div>
        </section>
    )
}

/**
 * PreviewContainer
 *
 * Displays a visual preview of the freelancer dashboard
 * to give users a quick overview of the product interface.
 */
function PreviewContainer() {
    return (
        <div className="preview-container pad-1 bgc-lv2 brad-2">
            <img
                src="https://raw.githubusercontent.com/AbdelMeza/Workflow/main/assets/Previews/Freelancer_dashboard_view.png"
                className="preview-image br brad-1"
                alt="preview-image"
            />
        </div>
    )
}