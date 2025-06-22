import st from './styles.module.scss';
import { FooterProps } from '../../others/types';

export const Footer = ({ active, finished }: FooterProps) => {
	return (
		<div className={st.footer}>
			<div className={st.container}>
				<div className={st.tasks}>
					<div>Active tasks: {active}</div>
					<div>Finished tasks: {finished}</div>
				</div>
				<div>Kanban board by Iakov, &nbsp; {new Date().getFullYear()}</div>
			</div>
		</div>
	);
};
