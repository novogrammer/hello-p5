import FirstApp from './FirstApp';
import './style.scss'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section class="p-section-first"></section>
<section class="p-section-second">.p-section-second</section>
`;




(window as any).firstApp=new FirstApp();
