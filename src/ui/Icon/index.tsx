import classNames from 'classnames'

interface IconProps {
  name: string
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}
const Icon: React.FC<IconProps> = ({ name, className, style, onClick }) => (
  <i
    role={onClick ? 'button' : 'img'}
    onClick={onClick}
    style={style}
    className={classNames(['material-icons-outlined', className])}
  >
    {name}
  </i>
)

export default Icon
