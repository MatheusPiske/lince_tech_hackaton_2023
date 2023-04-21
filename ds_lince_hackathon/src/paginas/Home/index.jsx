import useScript from "../../hooks/useScript";

function App() {   
    
    useScript("/js/index.js")

    return (
    <>
        <div className="sidebar close">
        <div className="logo-details">
        {/* <i className='bx bxl-c-plus-plus'></i> */}
        <img src="/images/lince_tech.jpeg" className='imagemSideBar'/>
        <span className="logo_name">Chamados</span>
        </div>
        <ul className="nav-links">
        <li>
            <a href="#">
            <i className='bx bx-grid-alt' ></i>
            <span className="link_name">Listagem</span>
            </a>
            <ul className="sub-menu blank">
            <li><a className="link_name" href="#">Categoria</a></li>
            </ul>
        </li>
        <li>
            <div className="iocn-link">
            <a href="#">
                <i className='bx bx-collection' ></i>
                <span className="link_name">Categoria</span>
            </a>
            <i className='bx bxs-chevron-down arrow' ></i>
            </div>
            <ul className="sub-menu">
            <li><a className="link_name" href="#">Categoria</a></li>
            <li><a href="#">Projetos</a></li>
            <li><a href="#">Manutenção</a></li>
            <li><a href="#">Melhorias</a></li>
            </ul>
        </li>
        <li>
            <div className="iocn-link">
            <a href="#">
                <i className='bx bx-book-alt' ></i>
                <span className="link_name">Cadastro</span>
            </a>
            <i className='bx bxs-chevron-down arrow' ></i>
            </div>
            <ul className="sub-menu">
            <li><a className="link_name" href="#">Posts</a></li>
            <li><a href="#">Fluxo 1</a></li>
            <li><a href="#">Fluxo 2</a></li>
            <li><a href="#">Fluxo 3</a></li>
            </ul>
        </li>
        <li>
            <a href="#">
            <i className='bx bx-compass' ></i>
            <span className="link_name">Pesquisar</span>
            </a>
            <ul className="sub-menu blank">
            <li><a className="link_name" href="#">Pesquisar</a></li>
            </ul>
        </li>
        <li>
            <a href="#">
            <i className='bx bx-history'></i>
            <span className="link_name">Histórico</span>
            </a>
            <ul className="sub-menu blank">
            <li><a className="link_name" href="#">Histórico</a></li>
            </ul>
        </li>
        <li>
            <a href="#">
            <i className='bx bx-cog' ></i>
            <span className="link_name">Configurações</span>
            </a>
            <ul className="sub-menu blank">
            <li><a className="link_name" href="#">Configurações</a></li>
            </ul>
        </li>
        <li>
        <div className="profile-details">
        <div className="profile-content">
            {/* <img src="image/profile.jpg" alt="profileImg"> */}
        </div>
        <div className="name-job">
            <div className="profile_name">DS501</div>
            <div className="job">Consulta de chamados</div>
        </div>
        <i className='bx bx-log-out' ></i>
        </div>
        </li>
        </ul>
        </div>
        <section className="home-section">
            <div className="home-content">
            <i className='bx bx-menu' ></i>
    
            </div>
        </section>

    </>
    )
}

export default App;
