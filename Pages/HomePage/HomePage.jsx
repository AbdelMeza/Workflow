import './HomePage.css'
import TextSlider from '../../Components/TextSlider/TextSlider'
import Button from '../../Components/Button/Button'
import authentificationManagement from '../../Stores/Authentification'
import UserProfile from '../../utils/UserProfile/UserProfile'

export default function HomePage() {
    return <div className="home-page bgc-lv1">
        <NavBar />
        <HeroSection />
        <PreviewContainer />
    </div>
}

function NavBar() {
    const { userData } = authentificationManagement()

    return <div className="navigation-bar flex">
        <div className="navigation-bar-content main-link-container flex">
            <div className="main-link flex gap-1 flex-c">
                <img src="https://raw.githubusercontent.com/AbdelMeza/Workflow/main/WorkFlow%20assets/Icons/Worflow-icon.png" alt="workflow-icon" width={25} />
                <TextSlider
                    type={"navigate"}
                    redirectTo={"/"}
                    classGiven={"mt-c"}
                    content={"WorkFlow"}
                />
            </div>
        </div>
        <div className="navigation-bar-content navigation-links-container flex-c gap-3">
            <TextSlider
                type={"navigate"}
                redirectTo={"/"}
                classGiven={"mt-c"}
                content={"Features"}
            />
            <TextSlider
                type={"navigate"}
                redirectTo={"/"}
                classGiven={"mt-c"}
                content={"Pricing"}
            />
            <TextSlider
                type={"navigate"}
                redirectTo={"/"}
                classGiven={"mt-c"}
                content={"Contact"}
            />
            <TextSlider
                type={"navigate"}
                redirectTo={"/"}
                classGiven={"mt-c"}
                content={"Support"}
            />
            <TextSlider
                type={"navigate"}
                redirectTo={"/"}
                classGiven={"mt-c"}
                content={"FAQ"}
            />
        </div>
        <div className="navigation-bar-content authentification-buttons flex jc-r">
            {userData ? <UserProfile /> :
                <>
                    <Button content={"Login"} size={"small"} path={"/login"} />
                    <Button content={"Get started"} size={"small"} classGiven={"btn-bgc brad-1"} path={"/signup"} />
                </>
            }
        </div>
    </div>
}

function HeroSection() {
    const { userData } = authentificationManagement()

    return <section className="hero-section" style={{ backgroundImage: "url('https://raw.githubusercontent.com/AbdelMeza/Workflow/main/WorkFlow%20assets/Background/Grid background.png')" }}>
        <div className="hero-section-content flex-c flex-d-c gap-3">
            <div className="upper-content">
                <h1 className="main-headline mff-b mt-c">Manage Your Clients and <br /> Projects Effortlessly</h1>
            </div>
            <div className="lower-content flex-c flex-d-c gap-2">
                <span className="sub-headline m-fs st-c">Track clients, organize projects, and collaborate <br /> effortlessly—all in one place.</span>
                {!userData ? <Button content={"Get started"} size={"small"} classGiven={"btn-bgc brad-1"} path={"/signup"} /> : null}
            </div>
        </div>
    </section>
}

function PreviewContainer() {
    return <div className="preview-container pad-1 bgc-lv2 brad-2">
        <img src="https://raw.githubusercontent.com/AbdelMeza/Workflow/main/WorkFlow%20assets/Previews/Freelancer dashboard.png" className='preview-image br brad-1' alt="preview-image" />
    </div>
}