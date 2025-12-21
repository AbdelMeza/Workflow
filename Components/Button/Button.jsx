import { useNavigate } from "react-router-dom"
import TextSlider from "../TextSlider/TextSlider"
import './Button.css'

export default function Button({ size, content, path, classGiven }) {
    const navigate = useNavigate()

    return <div className={`button-element ${size} ${classGiven}`}>
        <div className="button-content" onClick={() => { path ? navigate(`${path}`) : null }}>
            <TextSlider content={content} />
        </div>
    </div>
}