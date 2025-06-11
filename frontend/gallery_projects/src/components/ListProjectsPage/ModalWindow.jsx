import ReactDOM from "react-dom";
import Button from "../Button"
export default function ModalWindow({ children, isOpen, onClose, onConfirm}){
    if (!isOpen) return null;
    return ReactDOM.createPortal(
			<div
				className='modal'
				tabIndex='-1'
				style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title'>Подтверждение</h5>
							<Button
								type='button'
								className='btn-close'
								onClick={onClose}
							></Button>
						</div>
						<div className='modal-body'>
							<p>
								Вы уверены, что хотите{' '}
								<strong>удалить выбранные проекты?</strong>
							</p>
						</div>
						<div className='modal-footer'>
							<Button
								type='button'
								className='btn btn-primary'
								onClick={() => {
									onConfirm()
									onClose()
								}}
							>
								Сохранить изменения
							</Button>
							<Button
								type='button'
								className='btn btn-secondary'
								onClick={onClose}
							>
								Закрыть
							</Button>
						</div>
					</div>
				</div>
			</div>,
			document.body
		)
}