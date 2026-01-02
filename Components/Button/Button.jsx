import { useNavigate } from "react-router-dom"
import TextSlider from "../TextSlider/TextSlider"
import './Button.css'

export default function Button({ size, content, path, classGiven, disabled }) {
    const navigate = useNavigate()

    return <button className={`button-element ${size} ${classGiven}`} disabled={disabled} >
        <div className="button-content" onClick={() => { path ? navigate(`${path}`) : null }}>
            <TextSlider content={content} />
        </div>
    </button>
}