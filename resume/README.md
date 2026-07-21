# Résumé sources

Source and generated artifacts for Rodrigo Neves's résumé, plus a customizable LaTeX cover-letter template. The cover letter contains conspicuous placeholders and must be personalized before use.

Work inspired from [https://github.com/sb2nov/resume](https://github.com/sb2nov/resume) and [https://github.com/posquit0/Awesome-CV](https://github.com/posquit0/Awesome-CV)

Example

![Resume Screenshot](resume.png)

---

## How-to

Build the Docker image first:

```
make build
```

Then build the résumé with:

```
make cv
```
Build a personalized cover letter with:
```
make cover_letter
```

The cover-letter PDF is intentionally ignored by Git. Review and replace every angle-bracketed placeholder in `resume/coverletter.tex` before using it.

---
## Small guidelines

There are two main files inside `resume/`: `resume.tex` for the résumé and `coverletter.tex` for the cover-letter template. Both can be customized. Each file includes comments explaining the layout and content.

The résumé has a separate source file for each included section under `resume/files/`.
