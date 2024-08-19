class NavBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                ${this.getStyles()}
            </style>
            <nav class="nav-bar">
                <ul>
                    <li class="list" target="/index.html">
                        <a href="/index.html" class="nav-link">
                            <span class="icon">
                                <i class="fa-solid fa-house"></i>
                            </span>
                            <span class="text">홈</span>
                        </a>
                    </li>
                    <li class="list" target="/timetable/index.html">
                        <a href="/timetable/index.html" class="nav-link">
                            <span class="icon">
                                <i class="fa-solid fa-table"></i>
                            </span>
                            <span class="text">시간표</span>
                        </a>
                    </li>
                    <li class="list" target="/search/index.html">
                        <a href="/search/index.html" class="nav-link">
                            <span class="icon">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </span>
                            <span class="text">검색</span>
                        </a>
                    </li>
                    <li class="list" target="/my/index.html">
                        <a href="/my/index.html" class="nav-link">
                            <span class="icon">
                                <i class="fa-solid fa-user"></i>
                            </span>
                            <span class="text">마이</span>
                        </a>
                    </li>
                </ul>
                <div class="indicator"></div>
            </nav>
        `;
    }

    connectedCallback() {
        this.updateActiveTab();
    }

    updateActiveTab() {
        const currentPath = window.location.pathname;
        const lists = this.shadowRoot.querySelectorAll('.list');
        const indicator = this.shadowRoot.querySelector('.indicator');

        let targetIndex = 0;

        lists.forEach((listItem, index) => {
            const target = listItem.getAttribute('target');
            if (currentPath === target) {
                listItem.classList.add('active');
                targetIndex = index;
            } else {
                listItem.classList.remove('active');
            }
        });
        const positions = ['0%', '25%', '50%', '75%'];
        indicator.style.left = positions[targetIndex] || '0%';
    }

    getStyles() {
        return `
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

        :root {
            
        }

        @media (prefers-color-scheme: dark) {
            :root {
                
            }
        }

        @media screen and (max-width: 768px){

        .nav-bar {
            position: fixed;
            display: flex;
            flex-direction: column;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: #ffffff;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
            padding: 10px 0 10px 0;
            z-index: 2000;

            font-family: "Do Hyeon", sans-serif;
            font-weight: 400;
            font-style: normal;
        }

        .nav-bar ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: space-around;
        }

        .nav-bar li {
            flex: 1;
            text-align: center;
        }

        .nav-bar li.active a {
            color: #af18f0;
        }

        .nav-bar a {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            color: #1f1e1e;
            transition: color 0.3s ease;
        }

        .nav-bar a:hover,
        .nav-bar a:focus {
            color: #1f1e1ea2;
        }

        .nav-bar .icon {
            font-size: 28px;
            margin-bottom: 5px;
        }

        .nav-bar .text {
            font-size: 15px;
        }

        .indicator {
            position: absolute;
            bottom: 0;
            width: 25%; 
            height: 4px;
            background-color: #af18f0;
            transition: transform 0.3s ease;
        }
    
        }
        @media screen and (min-width: 769px){
        .nav-bar {
            width: 390px;
            position: fixed;
            display: flex;
            flex-direction: column;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            background-color: #ffffff;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
            padding: 10px 0 10px 0;
            z-index: 2000;

            font-family: "Do Hyeon", sans-serif;
            font-weight: 400;
            font-style: normal;
        }

        .nav-bar ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: space-around;
        }

        .nav-bar li {
            flex: 1;
            text-align: center;
        }

        .nav-bar li.active a {
            color: #af18f0;
        }

        .nav-bar a {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            color: #1f1e1e;
            transition: color 0.3s ease;
        }

        .nav-bar a:hover,
        .nav-bar a:focus {
            color: #1f1e1ea2;
        }

        .nav-bar .icon {
            font-size: 28px;
            margin-bottom: 5px;
        }

        .nav-bar .text {
            font-size: 15px;
        }

        .indicator {
            position: absolute;
            bottom: 0;
            width: 25%; 
            height: 4px;
            background-color: #af18f0;
            transition: transform 0.3s ease;
        }

        }
        `;
    }
}

customElements.define('nav-bar', NavBar);
