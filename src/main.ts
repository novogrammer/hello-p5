import App from './App';
import './style.scss'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section class="p-section-hero"></section>
<section class="p-section-about">.p-section-about</section>
`;




(window as any).app=new App();
