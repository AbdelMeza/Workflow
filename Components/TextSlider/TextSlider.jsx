import { useNavigate } from 'react-router-dom'
import './TextSlider.css'

export default function TextSlider({ content, classGiven, type, redirectTo }) {
    const navigate = useNavigate()

    function createContent() {
        if (type === "link") {
            return <a className={`slide-text`} href={redirectTo}>{content}</a>
        } else if (type === "navigate") {
            return <span className={`slide-text`} onClick={() => navigate(redirectTo)}>{content}</span>
        } else {
            return <span className={`slide-text`}>{content}</span>
        }
    }

    return <div className={`text-slider ${classGiven ? classGiven : ""}`}>
        {createContent()}
        {createContent()}
    </div>
}