"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Account = {
  id: string;
  username: string;
};

interface SelectedAffiliateAccountProps {
  accounts: Account[];
  onAccountSelect?: (account: string) => void;
}

const SelectedAffiliateAccount = ({
  accounts,
  onAccountSelect,
}: SelectedAffiliateAccountProps) => {
  const handleAccountSelect = (account: string) => {
    if (onAccountSelect) {
      onAccountSelect(account);
    }
  };
  return (
   < span className="space-y-2 w-full">
     <Select
     disabled={accounts.length === 0}
      onValueChange={(value) => {
        handleAccountSelect(value);
      }}
    >
      <SelectTrigger id="select-16">
        <SelectValue placeholder="Select account" />
      </SelectTrigger>
      <SelectContent>
        {accounts.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.username}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    </span>
  );
};

export default SelectedAffiliateAccount;
