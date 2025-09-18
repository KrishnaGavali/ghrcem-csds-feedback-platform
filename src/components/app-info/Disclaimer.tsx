import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

const Disclaimer = () => {
  const [open, setOpen] = useState(true);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
      }}
    >
      <DialogContent>
        <DialogTitle>Disclaimer</DialogTitle>
        <DialogDescription>
          This application was custom-built at the request of my professor to
          address a specific academic need and is not publicly available. We're
          happy you stopped by! To see how it works, please check out the demo
          video and the project's details on this page.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default Disclaimer;
