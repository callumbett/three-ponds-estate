# Amenities — image drops for the homepage "What's shared" carousel

Each subfolder feeds the auto-scrolling carousel above one card on the homepage `<Amenities />` block.

## Folder map

| Folder | Card on the homepage |
|---|---|
| `fire-pit/` | Communal fire pit |
| `kitchen-bbq/` | Outdoor kitchen & BBQ |
| `walking-track/` | Walking & cycling track |
| `aviation-museum/` | Aviation Museum at the gate |
| `linen/` | Linen & towels |
| `acreage/` | Quiet acreage |

## How the carousel works

- Auto-scrolls **right → left** at a slow, continuous pace.
- Loops seamlessly (the code duplicates the images internally).
- Pauses on hover so the visitor can dwell on a frame.
- Pauses entirely if the visitor has macOS / iOS "Reduce Motion" enabled.

## Files expected

Drop **3 – 6 photos** into each folder. Any filenames work — the code reads
the folder dynamically (well, almost — you'll need to tell Claude the
filenames after upload, same as we've been doing for the pods, so the
references can be wired up).

## Specs

- Format: JPG (or WEBP)
- Long edge: ~1600 px is plenty (the carousel image height is ~192 px on
  screen, so anything more is wasted bytes).
- Quality: 80 %
- Aspect: anything works, the carousel crops them to a consistent square
  frame as they scroll past.

## Once uploaded

Tell Claude **"I've uploaded the [item] amenity images"** with the
filenames, and the carousel will be wired up.
