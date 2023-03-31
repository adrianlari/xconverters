interface IFunctionCardProps {
	word: string;
	idx: number;
	hover: (index: number) => void;
}

export const FunctionCard = ({ word, idx, hover }: IFunctionCardProps) => {
	return (
		<div
			onMouseOver={() => {
				hover(idx);
			}}
			style={{ marginTop: '2%' }}
			key={idx}>
			<div className="container page-content">
				<div className="row">
					<div
						className="col-9"
						style={{ marginLeft: '12.5%' }}>
						<div className="transaction-info card">
							<div
								className="card-header status-text-success"
								style={{
									display: idx === 0 ? 'block' : 'none',
									backgroundColor: 'transparent',
								}}>
								<div className="card-header-item d-flex align-items-center">
									<span>The function is: {word}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FunctionCard;
