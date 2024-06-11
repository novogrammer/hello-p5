import FirstApp from './FirstApp';
import SecondApp from './SecondApp';
import './style.scss'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section class="p-section-first"></section>
<section class="p-section-second"></section>
`;




(window as any).firstApp=new FirstApp();
(window as any).secondApp=new SecondApp();
