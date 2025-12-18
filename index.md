---
layout: base.njk
title: Home
---

<h2>Blog Posts</h2>

<ul>
{%- for post in collections.post -%}
    <li>
        <a href="{{ post.url }}">{{ post.data.title }}</a>
        <p>{{ post.data.date | date: "%Y-%m-%d" }}</p>
    </li>
{%- endfor -%}
</ul>
