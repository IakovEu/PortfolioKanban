import st from './styles.module.scss';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Content } from '../Content';
import { MyContext } from '../../others/context';
import { LocalS } from '../../others/types';
import { useState } from 'react';

function App() {
	// Отслеживание состояния объекта
	const [data, setData] = useState<LocalS[] | null>(null);

	return (
		<MyContext.Provider
			value={{
				dat: data,
				setDat: (param) => {
					setData(param);
				},
			}}>
			<div className={st.layout}>
				<Header />
				<Content />
				<Footer
					active={data ? data[0].issues.length : 0}
					finished={data ? data[3].issues.length : 0}
				/>
			</div>
		</MyContext.Provider>
	);
}

export default App;
