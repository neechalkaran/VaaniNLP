#!/usr/bin/env python
# (c) 2021 Neechalkaran
import setuptools

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setuptools.setup(
    name="VaaniNLP",
    version="0.0.1",
    author="Neechalkaran",
    author_email="neechalkaran@gmail.com",
    description="Tamil Natural Language Processing",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/neechalkaran/VaaniNLP",
    project_urls={
        "Bug Tracker": "https://github.com/neechalkaran/VaaniNLP/issues",
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    license="MIT",
    package_dir={"tamil": "tamil"},
    packages=["tamil"],
    package_data={'tamil': ['stop_words.txt']},
    python_requires=">=3.6",
)