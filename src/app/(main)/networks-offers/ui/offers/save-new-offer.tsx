"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HardDriveDownload } from "lucide-react";
import { useState } from "react";
import MarkdownEditorWithPreview from "./markdown-editor-with-preview";
import PayoutInput from "./number-input";
import CardLayout from "@/components/shared-ui/layouts/card-layout";
import SelectAffiliateAccounts from "./affiliate-accounts";
import { toast } from "sonner";
import StatusInput from "./status-input";

interface Offer {
    id: string;
    affiliateNetworkName: string;
    status: string;
    referenceId: string;
    campaignId: number;
    name: string;
    countries: string[];
    description: string;
    rules: string;
    expiration_date: string;
    type: string;
    payout: number;
    available_days: number;
    auto_sup: boolean;
    default_suppression_link: string;
    last_suppression_updated_date: string;
    created_at: string;
    updated_at: string;
  }
interface SaveNewOfferProps {
  offer: Offer;
}

const SaveNewOffer = ({ offer }: SaveNewOfferProps) => {
  const [formData, setFormData] = useState<Offer>(offer);

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePayoutChange = (payout: number) => {
    setFormData({ ...formData, payout });
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const response = await api.post("api/v1/offer/save-offer", formData);

      const data = response.data;
      if (data.status === "success") {
        toast.success("Offer saved successfully.");
      } else {
        toast.error("An error occurred while saving the offer.");
      }
    } catch (error) {
      alert("An error occurred while saving the offer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <HardDriveDownload
          className="text-gray-600 hover:text-primary transition-all ease-in-out duration-300"
          size={17}
        />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Offer</SheetTitle>
          <SheetDescription>
            Modify the offer details and save.
          </SheetDescription>
        </SheetHeader>
        <div className="overflow-y-auto w-full mt-5 px-2">
          <div className="space-y-4 w-full">
            <div className="grid grid-cols-2 gap-6 w-full">
              <CardLayout className="p-2 h-[22rem]">
                <div className="w-full flex flex-col gap-3 justify-start items-start col-span-1">
                  <div className="w-full flex flex-col gap-3 justify-start items-start">
                    <Label htmlFor="affiliate_network_name">
                      Affiliate Network Name
                    </Label>
                    <Input
                      id="affiliate_network_name"
                      name="affiliate_network_name"
                      value={formData.affiliateNetworkName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-3 justify-start items-start">
                    <Label htmlFor="name">Offer Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-full gap-2 flex justify-between items-start">
                    <div className="w-1/2">
                      <StatusInput status={formData.status} />
                    </div>

                    <div className="w-1/2 space-y-2">
                      <Label htmlFor="expiration_date">Expiration Date</Label>
                      <Input
                        type="date"
                        id="expiration_date"
                        name="expiration_date"
                        value={formData.expiration_date}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <PayoutInput
                    onChange={handlePayoutChange}
                    value={formData.payout}
                  />
                </div>
              </CardLayout>

              <CardLayout className="p-2 h-[22rem]">
                <SelectAffiliateAccounts />
              </CardLayout>
            </div>
            <CardLayout className="p-2 h-[22rem]">
              <MarkdownEditorWithPreview htmlContent={formData.description} />
            </CardLayout>
          </div>
        </div>
        <SheetFooter className="mt-9">
          <SheetClose asChild>
            <Button className="bg-red-100 text-red-500" variant={"destructive"}>
              Cancel Action
            </Button>
          </SheetClose>
          <Button disabled={isLoading} onClick={handleSave}>
            {isLoading ? <p>save data ...</p> : <p>Save Offer</p>}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SaveNewOffer;
