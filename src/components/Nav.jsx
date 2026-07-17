const NAV_ITEMS = [
    { href: '#intro', label: '个人简介' },
    { href: '#second', label: '作品展示' },
    { href: '#first', label: '项目介绍' },
    { href: '#cta', label: '自我推荐' },
    { href: '#concat', label: '联系方式' },
]

const Nav = ({ activeId, onNavClick }) => {
    return (
        <nav id="nav">
            <ul>
                {NAV_ITEMS.map((item) => (
                    <li key={item.href}>
                        <a
                            href={item.href}
                            className={activeId === item.href ? 'active' : ''}
                            onClick={(e) => onNavClick && onNavClick(e, item.href)}
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Nav
