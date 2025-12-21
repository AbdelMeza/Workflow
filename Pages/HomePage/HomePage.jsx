import './HomePage.css'
import TextSlider from '../../Components/TextSlider/TextSlider'
import Button from '../../Components/Button/Button'

export default function HomePage() {
    return <div className="home-page bgc-lv1">
        <NavBar />
        <HeroSection />
    </div>
}

function NavBar() {
    return <div className="navigation-bar pad-3 flex">
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
            <Button content={"Login"} size={"small"} path={"/login"}></Button>
            <Button content={"Get started"} size={"small"} classGiven={"btn-bgc brad-1"} path={"/signup"}></Button>
        </div>
    </div>
}

function HeroSection() {
    return <section className="hero-section" style={{ backgroundImage: "url('https://raw.githubusercontent.com/AbdelMeza/Workflow/main/WorkFlow%20assets/Background/Grid background.png')" }}>

    </section>
}