import st from './styles.module.scss';

export const Footer = () => {
	return (
		<div className={st.footer}>
			<div className={st.container}>
				<div className={st.tasks}>
					<div>Active tasks: {0}</div>
					<div>Finished tasks: {0}</div>
				</div>
				<div>Kanban board by Iakov, &nbsp; {new Date().getFullYear()}</div>
			</div>
		</div>
	);
};
