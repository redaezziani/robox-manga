import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
const affiliateAccounts: Option[] = [
    {
      value: "account_1",
      label: "Account 1",
    },
    {
      value: "account_2",
      label: "Account 2",
    },
    {
      value: "account_3",
      label: "Account 3",
      disable: true,
    },
    {
      value: "account_4",
      label: "Account 4",
    },
    {
      value: "account_5",
      label: "Account 5",
    },
    {
      value: "account_6",
      label: "Account 6",
    },
    {
      value: "account_7",
      label: "Account 7",
    },
    
   
   
  ];
  

export default function SelectAffiliateAccounts() {
  return (
    <div className="space-y-2">
      <Label>
        Affiliate Accounts 
      </Label>
      <MultipleSelector
        commandProps={{
          label: "Select Affiliate Accounts ",
        }}
        defaultOptions={affiliateAccounts}
        placeholder="Select Affiliate Accounts "
        hideClearAllButton
        hidePlaceholderWhenSelected
        emptyIndicator={<p className="text-center text-sm">No results found</p>}
      />
    </div>
  );
}
