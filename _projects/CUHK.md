---
layout: page
title: Dataset Engineering & Stereo 3D Reconstruction
description: Research at CUHK – My Role as a Summer Research Intern
img: https://upload.wikimedia.org/wikipedia/commons/1/1c/CU_Emblem.jpg
importance: 1
category: group
related_publications: false
---

## Overview

From **June 2023** to **August 2023**, I participated in a summer research internship at **The Chinese University of Hong Kong (CUHK)**, collaborating with **Ren Lab** on **endoscopic 3D reconstruction** for medical applications. My work primarily involved **dataset analysis**, **stereo video preprocessing**, and **pipeline creation** for **pose** and **depth** estimation within an advanced **NeRF**-based framework. I also interacted with **Neural Radiance Fields (NeRF)** and **point cloud registration** concepts, gaining insight into cutting-edge image reconstruction and 3D alignment techniques used in minimally invasive surgery research.

<br>

## Project Highlights

1. **Dataset Exploration & Analysis**

   - Investigated a broad range of **endoscopic** and **stereo-based** datasets (e.g., **StereoMIS**, **SCARED**, **ENDOSLAM**, **C3VD**).
   - Compared data formats for multi-view or single-view frames, ground-truth depth availability, and camera pose annotations to determine the best fit for lab experiments.

2. **Preprocessing & Scripting**

   - Adapted **shell** and **MATLAB** scripts to split **stereo videos** into left/right frames for subsequent **depth** or **pose** estimation (e.g., `extract_left_right.sh`, `split_interlaced_stereo_frames_2.m`).
   - Explored the **sttr-light** stereo transformer for **disparity** and **depth** estimation, converting outputs into usable data for **3D reconstruction** tasks.

3. **Pose Estimation & Data Formatting**

   - Employed classical **COLMAP** pipelines for 3D scene reconstruction and updated the lab on how to align **camera-to-world** transformations with **NeRF**-style coordinate systems.
   - Documented the handling of `poses_bounds.npy` (including **3x4** rotation-translation matrices plus image focal parameters), ensuring consistent ingest for neural rendering frameworks.

4. **Technical Literature & Summaries**
   - Conducted in-depth reviews of **3D registration** methods such as **NeRF2NeRF**, **Deep Graph-based Spatial Consistency**, and **BUFFER** for point cloud alignment, summarizing their suitability for medical contexts.
   - Provided references and quick-start guidelines to lab members for **non-rigid** or **partial** point cloud registration libraries, highlighting best practices in medical data processing.

<br>

## My Additional Responsibilities

- **Data Consolidation & Task Management**

  - Organized **spreadsheet trackers** detailing dataset attributes (stereo vs. single view, presence of ground-truth depth, camera poses, dynamic vs. static scenes).
  - Coordinated with team members to ensure correct data labeling (e.g., specifying frames with surgical tools) and to deliver masked or pre-processed images on schedule.

- **Tooling & Documentation**

  - Authored concise tutorials on splitting raw **video** into structured left/right frames, using **OpenCV** for quick dataset previews, and employing **sttr-light** for disparity generation.
  - Maintained a **research wiki** explaining each script’s function and how camera intrinsics (H, W, focal) integrate with pose data for multi-view or NeRF-based workflows.

- **Research Discussions**
  - Joined daily research meetings on 3D reconstruction and minimally invasive surgery, exchanging ideas about **stereo geometry**, tissue deformation, and potential synergies with **NeRF**.
  - Shared synopses of new **3D registration** and **neural rendering** papers, ensuring the team remained updated on emerging trends in surgical AI.

<br>

## Technical Contributions

**Stereo Video Processing & Depth Generation**

- Automated frame splitting for **interlaced stereo** footage to facilitate efficient disparity/depth calculation.
- Assessed approaches to handle **texture-poor** and **occluded** frames, key challenges in dynamic medical scenes.

**Pose & Transform Management**

- Provided guidelines for merging classical **SfM** outputs (e.g., COLMAP-based pose files) with **neural** reconstruction pipelines.
- Clarified usage of **LLFF**-style `poses_bounds.npy`, bridging standard 3D geometry concepts with advanced NeRF frameworks.

**Dataset Structuring & Mask Handling**

- Proposed a **uniform directory layout** (e.g., `images`, `images_right`, `depth`, `masks`, `poses`) for consistent dataset ingestion.
- Investigated AI-driven segmentation for surgical tools, establishing a preliminary plan to integrate these masks into the 3D pipeline.

<br>

## Project Outcomes

- **High-Quality Data Pipeline**: Standardized folder structures and well-documented preprocessing steps significantly reduced data mismatch errors, speeding up lab experimentation.
- **Enhanced Research Agility**: By providing curated references and clear scripts, lab members could quickly prototype new stereo-based experiments—fueling faster iteration cycles.
- **Scalable Framework**: A modular pipeline emerged for future expansions (e.g., in-vivo data, multi-tool segmentation), positioning the lab for further success in **pose-free** NeRF research.

<br>

## Personal Growth & Reflection

- **Deeper Understanding of 3D**: Learned the intricacies of **stereo geometry**, **camera calibration**, and advanced **NeRF** use-cases—critical elements in modern 3D medical imaging.
- **Versatile Skillset**: Balanced low-level data tasks with high-level conceptual discussions, honing my adaptability in a fast-moving, interdisciplinary environment.
- **Collaboration & Communication**: Strengthened my ability to translate domain-specific requirements (surgeon feedback, new AI methods) into practical, reproducible data workflows.

<br>

## Final Thoughts

My summer at **CUHK** provided a compelling mix of **hands-on** dataset engineering and **immersive** research exposure in **stereo 3D reconstruction**. I’m proud of delivering a well-structured data pipeline that smooths the path for future **pose** and **depth** breakthroughs, while simultaneously deepening my grasp of **NeRF** and **3D registration** methods. This experience highlights the importance of **rigorous data engineering** in enabling state-of-the-art medical AI.
