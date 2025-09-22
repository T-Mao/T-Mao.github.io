---
layout: page
title: Veeva Systems
description: Associate Software Engineer in Test - Infrastructure
img: assets/img/Veeva.png
importance: 1
category: work
related_publications: false
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="assets/img/veeva1.gif"
       title="Veeva"
       class="rounded z-depth-0"
       max-width="500px"
    %}
  </div>
</div>

## Overview

At **Veeva Systems** (Vault **Infrastructure / QA & Release Engineering**), I work as an **Associate Software Engineer in Test (Infrastructure)**. My focus is building reliability, performance, and release confidence for core platform components, especially:

- **Durable Queue Framework** (high-throughput job orchestration)
- **FileManager / FSA** (file storage & access layer)
- **Configuration Framework** (safe, auditable configuration at scale)

I design and automate tests, harden pipelines, and collaborate with platform engineers so features ship **fast, stable, and compliant**.

## Office Gallery

<style>
  .office-gallery { column-gap: 0.75rem; }
  @media (max-width: 575.98px) { .office-gallery { column-count: 2; } }
  @media (min-width: 576px)      { .office-gallery { column-count: 2; } }
  @media (min-width: 768px)      { .office-gallery { column-count: 3; } }
  @media (min-width: 992px)      { .office-gallery { column-count: 4; } }

  .office-gallery .item { break-inside: avoid; margin-bottom: 0.75rem; }
  .office-gallery figure { margin: 0; } 
  .office-gallery .thumb {
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(0,0,0,.08);
    transition: transform .2s ease, box-shadow .2s ease;
  }
  .office-gallery .thumb:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(0,0,0,.12);
  }
  .office-gallery img { width: 100%; height: auto; display: block; image-orientation: from-image; }
</style>

{% assign photos = site.static_files
  | where_exp: "f", "f.path contains '/assets/img/VeevaPhoto_web/'"
  | where_exp: "f", "f.extname == '.jpg' or f.extname == '.jpeg' or f.extname == '.JPG' or f.extname == '.JPEG'"
%}
{% assign photos = photos | sample: photos.size %}

<div class="office-gallery">
  {% for photo in photos %}
    {% capture img_path %}{{ photo.path | remove_first: '/' }}{% endcapture %}
    {% capture img_title %}Veeva Office Photo {{ forloop.index }}{% endcapture %}
    <div class="item">
      <div class="thumb">
        {% include figure.liquid loading="lazy" path=img_path title=img_title class="rounded z-depth-1" max-width="100%" %}
      </div>
    </div>
  {% endfor %}
</div>

## Additional Resources

- **Veeva (Company)**: <https://www.veeva.com>
