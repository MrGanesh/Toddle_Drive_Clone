import driveIcon from "../../assets/newDrive.jpeg";
import "./styles.css";
export default function Header() {
  return (
    <div className="header">
      <img src={driveIcon} height="100" width="200" alt="driveIcon" />
    </div>
  );
}
