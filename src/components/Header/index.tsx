import st from './styles.module.scss';
import { useState, useEffect, useRef } from 'react';

export const Header = () => {
	const [isAvatarOpen, setIsAvatarOpen] = useState<boolean>(false);
	const openRef = useRef<HTMLButtonElement | null>(null);

	// Закрытие окна аватара при клике на любую область кроме блока аватара
	const handleClickOutside = (event: MouseEvent): void => {
		if (openRef.current && !openRef.current.contains(event.target as Node)) {
			setIsAvatarOpen(false);
		}
	};
	// Обработчик клика на область
	useEffect(() => {
		isAvatarOpen && document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [isAvatarOpen]);

	return (
		<header className={st.header}>
			<div className={st.container}>
				<h1 className={st.title}>Awesome Kanban Board</h1>
				<button
					ref={openRef}
					className={st.buttonAvatar}
					onClick={() => {
						setIsAvatarOpen(!isAvatarOpen);
					}}>
					<div className={st.avatar} />
					{isAvatarOpen ? (
						<div className={`${st.arrow} ${st.arrowReversed}`} />
					) : (
						<div className={st.arrow} />
					)}
				</button>
				{isAvatarOpen && (
					<div className={st.openWindow}>
						<div className={st.rhombus}></div>
						<p className={st.profile}>Profile</p>
						<p className={st.logOut}>Log Out</p>
					</div>
				)}
			</div>
		</header>
	);
};
