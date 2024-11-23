import React, { FC } from 'react';
import OptionQuoteDto from "@/lib/entity/OptionQuoteDto";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {formatDate} from "@/lib/utils/DateTimeUtils";

interface OptionCardProps {
    option: OptionQuoteDto;
}

const OptionCard: FC<OptionCardProps> = ({ option }) => {
    return (
        <Card className="my-2">
            <CardHeader>
                <CardTitle>{option.symbol}</CardTitle>
            </CardHeader>
            <CardContent>
                <p><strong>Underlying Symbol:</strong> {option.underlyingSymbol}</p>
                <p><strong>Expiration Date:</strong>{new Date(option.expirationDate).toLocaleDateString()}</p>
                <p><strong>Type:</strong> {option.type}</p>
                <p><strong>Strike Price:</strong> ${option.strikePrice?.toFixed(2)}</p>
                <p><strong>Ask Price:</strong> ${option.askPrice?.toFixed(2)}</p>
                <p><strong>Bid Price:</strong> ${option.bidPrice?.toFixed(2)}</p>
                <p><strong>Timestamp:</strong> {formatDate(option.timestamp)}</p>
            </CardContent>
            <CardFooter></CardFooter>
        </Card>
    );
};

export default OptionCard;
