import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { OptionQuote } from "@/lib/types/OptionQuote";

interface TradeModalProps {
  option: OptionQuote;
  isOpen: boolean;
  onClose: () => void;
}

export function TradeModal({ option, isOpen, onClose }: TradeModalProps) {
  const [contracts, setContracts] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement trade submission logic here
    console.log("Submitting trade:", {
      ...option,
      contracts,
      totalCost: option.askPrice * contracts * 100, // Each contract is for 100 shares
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Start {option.type.toUpperCase()} Option Trade
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <label>Symbol: {option.symbol}</label>
            <label>Strike: ${option.strikePrice}</label>
            <label>
              Expiration: {new Date(option.expirationDate).toLocaleDateString()}
            </label>
            <label>Price per contract: ${option.askPrice}</label>
          </div>

          <div className="grid gap-2">
            <label htmlFor="contracts">Number of Contracts</label>
            <Input
              id="contracts"
              type="number"
              min="1"
              value={contracts}
              onChange={(e) => setContracts(parseInt(e.target.value))}
            />
          </div>

          <div className="font-bold">
            Total Cost: ${(option.askPrice * contracts * 100).toFixed(2)}
          </div>

          <Button type="submit" className="w-full">
            Place Trade
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
