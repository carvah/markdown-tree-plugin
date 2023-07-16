# Markdown Tree plugin

To create directory trees with a more visually appealing format using the Markdown Tree plugin, follow these steps:

1. Start with the root directory.
2. Use indentation with spaces or tabs to represent nested directories.
3. Place files directly under their respective directories.

## Example

Consider the following directory structure:

```
root
    second
        third
            fourth
                file1.jpg
                file2.txt
                file3.pdf
```

To transform this structure into a prettier directory tree using the **Markdown Tree** plugin, use the following input:

``` 
```markdown-tree
root
    second
        third
            fourth
                file1.jpg
                file2.txt
                file3.pdf
```

When rendered the output will be:

```plaintext
.
└── root
    └── second
        └── third
            └── fourth
                ├── file1.jpg
                ├── file2.txt
                └── file3.pdf
```

Credits to https://gitlab.com/nfriend for making the most used directory plugin online in https://tree.nathanfriend.io/

