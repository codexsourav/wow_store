import { X } from "@styled-icons/bootstrap";

function Badge({ title, onClick }) {
    return (

        <div style={{ display: "flex", justifyContent: "space-evenly", background: "#e5ba73", paddingInline: 5, paddingTop: 3, marginRight: 3, paddingBottom: 3, alignItems: "center", display: "inline-block", color: "#fff", fontSize: 12 }} >
            <span style={{ marginLeft: 3 }}>{title.toUpperCase()}</span>
            <X size={18} style={{ cursor: 'pointer', marginLeft: 5 }} onClick={onClick} />
        </div>
    )
}
export default Badge