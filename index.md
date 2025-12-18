---
layout: base.njk
title: Home
---

{% assign featuredPost = collections.post | last %}

<div class="featured-post">
    <a href="{{ featuredPost.url }}">
        <h2>{{ featuredPost.data.title }}</h2>
        <p>{{ featuredPost.templateContent | truncatewords: 20 }}</p>
    </a>
</div>

<div class="post-grid">
{%- for post in collections.post | reverse -%}
    {% if post.url != featuredPost.url %}
    <div class="post-card">
        <a href="{{ post.url }}">
            <h3>{{ post.data.title }}</h3>
            <p>{{ post.templateContent | truncatewords: 10 }}</p>
        </a>
    </div>
    {% endif %}
{%- endfor -%}
</div>
