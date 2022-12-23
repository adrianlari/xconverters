import { converters } from "../convertersObjects";
import ResultRow from "./ResultRow";

interface ConvertedRowParams {
    conversionTypeId: number;
    result: string;
}

const ConvertedRow = ({ conversionTypeId, result }: ConvertedRowParams) => {
    let label = converters.filter((pair) => pair.value === conversionTypeId)[0].label;

    if (!result) return "";

    return (
        <ResultRow label={label} result={result} />
    );
}

export default ConvertedRow;