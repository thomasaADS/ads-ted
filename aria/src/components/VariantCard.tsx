import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ExternalLink } from "lucide-react";
import { platformConfig, type AdVariant, type Platform } from "@/lib/api";

interface VariantCardProps {
  variant: AdVariant;
  onRegenerateHeadline?: () => void;
  onPublish?: () => void;
}

export function VariantCard({ variant, onRegenerateHeadline, onPublish }: VariantCardProps) {
  const config = platformConfig[variant.platform];
  const imageUrl = variant.platform === 'meta' 
    ? (variant.image_urls?.square || variant.image_urls?.portrait)
    : (variant.image_urls?.landscape || variant.image_urls?.square);

  return (
    <Card className="rounded-2xl shadow-card p-4 gradient-card border-border/50 hover:border-primary/30 transition-all">
      <div className="grid gap-4">
        {/* Image Preview */}
        <div className="relative rounded-xl overflow-hidden aspect-square bg-muted/30">
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt="Ad creative"
                className="w-full h-full object-cover"
              />
              <Badge className={`absolute top-2 left-2 ${config.color}`}>
                <span className="mr-1">{config.icon}</span>
                {config.label}
              </Badge>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-muted-foreground/50" />
            </div>
          )}
        </div>

        {/* Audience Info */}
        {variant.audience && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {variant.audience.geo && (
              <span>
                {variant.audience.geo.city}, {variant.audience.geo.country}
              </span>
            )}
            {variant.audience.age_range && (
              <span className="opacity-60">
                · {variant.audience.age_range.min}-{variant.audience.age_range.max}
              </span>
            )}
          </div>
        )}

        {/* Headline */}
        <div className="font-semibold text-lg">{variant.headline}</div>

        {/* Primary Text */}
        <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
          {variant.primary_text}
        </p>

        {/* CTA & URL */}
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-medium">
            {variant.cta.replace(/_/g, ' ')}
          </Badge>
          {variant.final_url && (
            <a
              href={variant.final_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-accent hover:underline flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              <span className="truncate max-w-[200px]">
                {variant.final_url}
              </span>
            </a>
          )}
        </div>

        {/* Interests */}
        {variant.audience?.interests && variant.audience.interests.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {variant.audience.interests.map((interest, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="text-xs border-border/50"
              >
                {interest}
              </Badge>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigator.clipboard.writeText(variant.headline)}
            className="text-xs"
          >
            Copy Headline
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigator.clipboard.writeText(variant.primary_text)}
            className="text-xs"
          >
            Copy Body
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const audienceText = variant.audience?.interests?.join(', ') || '';
              navigator.clipboard.writeText(audienceText);
            }}
            className="text-xs"
          >
            Copy Audience
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => imageUrl && window.open(imageUrl, '_blank')}
            className="text-xs"
          >
            Download Image
          </Button>
        </div>
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRegenerateHeadline}
            className="flex-1"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
          <Button
            size="sm"
            onClick={onPublish}
            className="flex-1"
          >
            Publish to {config.label}
          </Button>
        </div>
      </div>
    </Card>
  );
}
