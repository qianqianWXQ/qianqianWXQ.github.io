const SelfRecommend = () => {
    return (
        <section id="cta" className="main special">
            <header className="major">
                <h2>自我推荐</h2>
            </header>
            <ul className="statistics">
                <li className="style1">
                    <span className="icon solid fa-code-branch"></span>
                    <div>前端</div>
                </li>
                <li className="style2">
                    <span className="icon solid fa-signal"></span>
                    <div>后端</div>
                </li>
                <li className="style3">
                    <span className="icon solid fa-laptop"></span>
                    <div>服务端</div>
                </li>
                <li className="style4">
                    <span className="icon fa-folder-open"></span>
                    <div>数据处理</div>
                </li>
                <li className="style5">
                    <span className="icon fa-gem"></span>
                    <div>软技能</div>
                </li>
            </ul>

            <ul className="features">
                <li>
                    <h3>🌱 核心技能</h3>
                    <span className="left">
                        掌握Node.js全栈开发<br />
                        技术标签 - React/Vue | Node.js<br />
                        4年打磨前端工程化经验，1.5年淬炼全栈能力<br />
                    </span>
                </li>
                <li>
                    <h3>🚀 核心项目</h3>
                    <span className="left">
                        留言板系统<br />
                        采用JWT鉴权+消息实时推送<br />
                        自主完成架构设计→线上服务端部署<br />
                        <a target="_blank" href="https://lyb.idsply.xyz/">[点击查看实时系统] </a>
                    </span>
                </li>
                <li>
                    <h3>✨ 独特价值</h3>
                    <span className="left">
                        前端出身，兼具后端部署视角<br />
                        技术理性 - 融合跨学科思维模型<br />
                        持续进化 - 空窗期产出全栈项目并发布上线<br />
                    </span>
                </li>
            </ul>
        </section>
    )
}

export default SelfRecommend
