import './TwoHeader.css';

interface TwoHeaderProps {
    title: string;
}

const TwoHeader: React.FC<TwoHeaderProps> = ({ title }) => {
  return (
    <div className="header">
        {title}
    </div>
  )
}
export default TwoHeader;