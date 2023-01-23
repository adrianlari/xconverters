import React, { useState } from 'react';
import * as checks from '../check';
import { TokenPayment } from '@elrondnetwork/erdjs/out/tokenPayment';
import BigNumber from 'bignumber.js';

interface ResultRowParams {
	label: string;
	result: string;
}

const ResultRow = ({ label, result }: ResultRowParams) => {
	const [showCheck, setShowCheck] = useState(false);

	const copyToCliboard = async (text: string, event: any) => {
		navigator.clipboard.writeText(text);

		setShowCheck(true);
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setShowCheck(false);
	};

	const displayDenominationIfNeeded = () => {
		if (
			label.endsWith('Decimal') &&
			checks.decimal(result) &&
			result.length > 12 &&
			result.length < 60
		) {
			let denomination = '';
			try {
				denomination = TokenPayment.egldFromBigInteger(
					BigNumber(result)
				).toPrettyString();
			} catch {}

			return (
				<div
					style={{
						display: denomination !== '' ? 'block' : 'none',
						position: 'absolute',
						top: '15px',
						left: '15px',
						color: 'GrayText',
					}}>
					{denomination}
				</div>
			);
		}
	};

	return (
		<div>
			<div className="row py-3 border-bottom detail-item">
				<div className="col-lg-3 text-secondary text-lg-right pl-lg-spacer">
					{label}
				</div>
				<div className="col pr-lg-spacer">
					<div className="d-flex align-items-center text-break-all">
						{result}
						<div>{displayDenominationIfNeeded()}</div>
						{/* eslint-disable-next-line*/}
						<a
							onClick={(event) => copyToCliboard(result, event)}
							className="side-action fa fa-check-double">
							<svg
								style={{ display: showCheck ? 'none' : 'block' }}
								aria-hidden="true"
								focusable="false"
								data-prefix="far"
								data-icon="clone"
								className="svg-inline--fa fa-clone fa-w-16 "
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512">
								<path
									fill="currentColor"
									d="M464 0H144c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h320c26.51 0 48-21.49 48-48v-48h48c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM362 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h42v224c0 26.51 21.49 48 48 48h224v42a6 6 0 0 1-6 6zm96-96H150a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h308a6 6 0 0 1 6 6v308a6 6 0 0 1-6 6z"></path>
							</svg>
							<svg
								style={{ display: showCheck ? 'block' : 'none' }}
								aria-hidden="true"
								focusable="false"
								data-prefix="far"
								data-icon="check"
								className="svg-inline--fa fa-check fa-w-16 text-primary"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512">
								<path
									fill="currentColor"
									d="M 435.848 83.466 L 172.804 346.51 l -96.652 -96.652 c -4.686 -4.686 -12.284 -4.686 -16.971 0 l -28.284 28.284 c -4.686 4.686 -4.686 12.284 0 16.971 l 133.421 133.421 c 4.686 4.686 12.284 4.686 16.971 0 l 299.813 -299.813 c 4.686 -4.686 4.686 -12.284 0 -16.971 l -28.284 -28.284 c -4.686 -4.686 -12.284 -4.686 -16.97 0 Z"></path>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResultRow;
