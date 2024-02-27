import { Component, Inject, Renderer2, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import ConfettiGenerator from "@neuralabs/confetti-party";
import YouTubePlayer from 'youtube-player';

@Component({
  selector: 'ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AskComponent implements OnInit, OnDestroy {
  protected showQuestion: boolean = true;

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.renderer.addClass(this.document.body, 'pink-background');

    let player;

    player = YouTubePlayer('video-player', {width: 0, height: 0,});
    player.loadVideoById('8SeRU_ZPDkE', 34);
    player.playVideo();
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, 'pink-background');
  }

  moveButton(event: MouseEvent): void {
    const button = event.target as HTMLElement;

    // Pobierz wymiary okna przeglądarki
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    // Pobierz wymiary przycisku
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;


    // Oblicz maksymalne wartości przesunięcia, tak aby przycisk pozostał w obrębie okna
    const maxX = (windowWidth - buttonWidth)/2;
    const maxY = (windowHeight - buttonHeight)/2;

    const rect = button.getBoundingClientRect();

    const newX = this.getRandom(-maxX, maxX);
    const newY = this.getRandom(-maxY/2, maxY);

    // Użyj transformacji CSS do przesunięcia przycisku
    button.style.transform = `translate(${newX}px, ${newY}px)`;
  }

   getRandom(min: number, max: number): number {
    let returnValue = Math.floor(Math.random() * (max - min + 1)) + min;
    if(Math.abs(returnValue) < 70){
      return this.getRandom(min, max);
    }

    return returnValue;
  }

  showConfetti() {
    const confettiCanvas = new ConfettiGenerator({
      canvasId: "confetti-canvas"
    });
    //confettiCanvas.addRandomConfetti();
    confettiCanvas.addConfetti({
      emojis: ['🩷'],
      emojiSize: 25, // Size of emojis in pixels, default: 80
      confettiNumber: 80, // Number of emojis per "explosion", default: 40

    })
    confettiCanvas.celebrate(1);
    setTimeout(() => {
      confettiCanvas.clearCanvas();
    }, 5000);
  }

  showAnswer() {
    this.showQuestion = false;
    this.showConfetti();
    }
}
