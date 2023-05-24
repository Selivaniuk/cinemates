import classNames from 'classnames'

interface IconProps {
  name: string
  className?: string
  style?: React.CSSProperties
  onclick?: () => void
}
const Icon: React.FC<IconProps> = ({ name, className, style, onclick }) => (
  <i
    role={onclick ? 'button' : 'img'}
    onClick={onclick}
    style={style}
    className={classNames(['material-icons-outlined', className])}
  >
    {name}
  </i>
)

export default Icon
