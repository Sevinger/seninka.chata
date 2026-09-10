#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Použití: $0 '/cesta/ke/videu-bez-hudby.mp4'" >&2
  exit 1
fi

source_video=$1
project_root=$(cd "$(dirname "$0")/.." && pwd -P)
output_dir="$project_root/public/video"
mkdir -p "$output_dir"

ffmpeg -y -hide_banner -loglevel error -ss 0.35 -t 5.25 -i "$source_video" -an \
  -filter_complex "[0:v]fps=25,scale=1600:-2:force_original_aspect_ratio=decrease,split[forward][reverse];[reverse]reverse[back];[forward][back]concat=n=2:v=1:a=0,format=yuv420p[out]" \
  -map "[out]" -c:v libx264 -preset slow -b:v 2600k -maxrate 3000k -bufsize 6000k -movflags +faststart "$output_dir/seninka-hero-desktop.mp4"

ffmpeg -y -hide_banner -loglevel error -ss 0.35 -t 5.25 -i "$source_video" -an \
  -filter_complex "[0:v]fps=24,scale=-2:960:force_original_aspect_ratio=decrease,crop=720:960:x=(iw-720)*0.48:y=0,split[forward][reverse];[reverse]reverse[back];[forward][back]concat=n=2:v=1:a=0,format=yuv420p[out]" \
  -map "[out]" -c:v libx264 -preset slow -b:v 1250k -maxrate 1500k -bufsize 3000k -movflags +faststart "$output_dir/seninka-hero-mobile.mp4"

for output_video in "$output_dir/seninka-hero-desktop.mp4" "$output_dir/seninka-hero-mobile.mp4"; do
  ffprobe -v error -show_entries stream=codec_name,width,height -show_entries format=duration,size -of json "$output_video"
done
