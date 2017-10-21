import { Component, OnInit } from '@angular/core';
import { AllAlgorithmsService } from './allAlgorithms.service';

@Component({
    selector: 'all-algorithms',
    providers: [AllAlgorithmsService],
    templateUrl: `./allAlgorithms.html`,
})
export class AllAlgorithmsComponent implements OnInit {

    allSections: AlgorithmsSection[] = [];

    constructor(private allAlgorithmsService: AllAlgorithmsService) { }

    getAllAlgorithms(): void {
        this.allAlgorithmsService.getAllAlgorithms().then(
            allAlgorithms => {
                const allAlgorithmsJSON = allAlgorithms;
                for (let key of Object.keys(allAlgorithmsJSON)) {
                    let currentSection: AlgorithmsSection = {
                        theme: key,
                        algorithms: []
                    };
                    for (let algo of allAlgorithmsJSON[key]) {
                        let currentAlgorithm: Algorithm = {
                            title: algo[0],
                            slug: algo[1]
                        }
                        currentSection.algorithms.push(currentAlgorithm);
                    }
                    this.allSections.push(currentSection);
                }
           }
        );
    }

    ngOnInit() {
        this.getAllAlgorithms();
    }

    makeSlug(name: string) {
        return name.toLowerCase().split(' ').join('-');
    }
}

class AlgorithmsSection {
    theme: string;
    algorithms: Algorithm[]
}

class Algorithm {
    title: string;
    slug: string;
}
