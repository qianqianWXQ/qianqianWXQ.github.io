const ProjectsSection = () => {
    return (
        <section id="first" className="main">
            <header className="major">
                <h2 className="center">项目介绍</h2>
            </header>
            <ul className="features custom">
                <li className="center">
                    <span className="align-left">
                        项目名称：人才管理平台 <br />
                        技术要点：React<br />
                        服务对象: 政府+教育机构 <br />
                        业务内容：政府、机构考试全流程 <br />
                        项目职责：<br />
                        1. 独立负责微前端项目的接入和改造; <br />
                        2. 独立负责微前端项目的接入和改造; <br />
                        3. 负责项目日常维护及后台cms系统；
                    </span>
                </li>

                <li className="center">
                    <span className="align-left">
                        项目名称：考试管理系统 <br />
                        技术要点：Electron、React <br />
                        服务对象：政府+教育机构 <br />
                        业务内容：离线考试 <br />
                        项目职责：<br />
                        1. 独立负责项目基建工作 <br />
                        2. 独立负责本地 indexdb 存储;
                    </span>
                </li>

                <li className="center">
                    <span className="align-left">
                        项目名称：教之舟<br />
                        技术要点：Vue、Uni-app、Echarts <br />
                        服务对象：学校、教师、学生 <br />
                        业务内容：数据可视化 <br />
                        项目职责：<br />
                        1. 独立负责前端项目可视化改造; <br />
                        2. 接入 uni-app，实现可视化图表跨端展示;
                    </span>
                </li>
            </ul>
            <footer className="major">
                <ul className="actions special">
                    <span>详见简历</span>
                </ul>
            </footer>
        </section>
    )
}

export default ProjectsSection
