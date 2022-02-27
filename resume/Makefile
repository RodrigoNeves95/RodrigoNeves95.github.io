build:
	docker build -t latex_pdf .

cv:
	docker run --rm -i -v $(PWD):/data latex_pdf xelatex --output-directory resume resume/resume.tex  
	open resume/resume.pdf
	
cover_letter:
	docker run --rm -i -v $(PWD):/data latex_pdf xelatex --output-directory resume resume/coverletter.tex  
	gio open resume/coverletter.pdf
