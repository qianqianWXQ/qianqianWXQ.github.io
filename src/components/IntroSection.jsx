const IntroSection = () => {
    return (
        <section id="intro" className="main">
            <div className="spotlight">
                <div className="content">
                    <header className="major">
                        <h2>个人简介</h2>
                    </header>
                    <span className="align-left">
                        • 职业身份：前端工程师 | 全栈(服务端部署)<br />
                        • 个人学历：计算机科学与技术专业 本科<br />
                        • 工作经历：4年前端工程化开发经验 + 全栈技术实践<br />
                        • 个人成就：<br />
                        1. 构建高性能SPA应用（Vue/React框架） <br />
                        2. 搭建企业级前端架构（Webpack优化） <br />
                        3. 全流程解决方案设计（自研留言板系统）<a target="_blank" href="https://lyb.idsply.xyz/">点击查看</a>
                    </span>
                </div>
                <span className="image">
                    <img src="/images/avatar.jpg" alt="" />
                </span>
            </div>
        </section>
    )
}

export default IntroSection
