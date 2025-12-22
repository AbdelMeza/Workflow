import KeyPerfIndicators from "../../../Components/KPIs/KeyPerfIndicator"
    
export default function Overview() {
    return <div className="overview">
        <div className="key-performance-indicators-container flex gap-1">
            <KeyPerfIndicators />
        </div>
    </div>
}