import { glossaryTerms } from "@/data/appData";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const GlossaryTooltip = ({ term }: { term: string }) => {
  const item = glossaryTerms.find((entry) => entry.termo.toLowerCase() === term.toLowerCase());
  if (!item) return <span>{term}</span>;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" className="reading-term italic underline">
          {term}
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs border bg-popover text-popover-foreground shadow-soft">
        <p className="font-semibold">{item.termo}</p>
        <p className="mt-1 text-sm text-muted-foreground">{item.definicao}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default GlossaryTooltip;
