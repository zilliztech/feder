import setuptools

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setuptools.setup(
    name="feder-py",
    version="0.1.0",
    author="min.tian@zilliz",
    author_email="min.tian@zilliz.com",
    description="Feder for python",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/zilliztech/feder",
    classifiers=[
        "ANNS Visualization",
    ],
    package_dir={"": "src"},
    packages=setuptools.find_packages(where="src"),
    python_requires=">=3.6",
)
